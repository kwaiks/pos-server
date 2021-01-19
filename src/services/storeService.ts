import bcrypt from "bcrypt";
import fs from "fs";
import { raw } from "objection";
import {StoreItem, Store} from "@/models/store";
import {StoreUser} from "@/models/storeUser";
import {User} from "@/models/users";
import AppError from "@/utils/error";
import StoreGallery from "@/models/storeGallery";
import differentObjects from "@/utils/differentObjects";
import StoreCategory from "@/models/storeCategory";
import StoreFacility from "@/models/storeFacility";
import StoreMenuCategory from "@/models/storeMenuCategory";


interface StoreItemEdit extends StoreItem {
    category: Array<Object>;
    newCategories: Array<Object>;
    facility: Array<Object>;
    newFacilities: Array<Object>;
}

export default class StoreService {
    async addStore(store: StoreItem){
        try {
            const userPin = await bcrypt.hash("1111", 10);
            const user = await User.query()
                                        .select([
                                            "userFirstName",
                                            "userLastName"
                                        ])
                                        .where("id", store.ownerId)
                                        .first();
            const tx = await Store.transaction(async (trx) => {
                const result = await Store.query(trx)
                                .insertGraph({...store,
                                    storeUser:{
                                        storeUserName: `
                                        ${user.userFirstName} 
                                        ${user.userLastName 
                                            ? user.userLastName
                                            : ""}`,
                                        storeUserRole: "owner",
                                        storeUserPin: userPin
                                }});
                return result;
            });
            return { success: true, data: tx.id };
        }catch (err){
            if (err instanceof AppError){
                throw err;
            }
            throw new AppError("AddStore", err);
        }
    }


    // edit Store
    async editStore(store: StoreItemEdit){
        const facilities = {
            new: differentObjects(store.newFacilities,store.facility,"id"),
            removed: differentObjects(store.facility,store.newFacilities,"id")
        };
        const categories = {
            new: differentObjects(store.newCategories,store.category,"id"),
            removed: differentObjects(store.category,store.newCategories,"id")
        };
        const mappedNewFacilities = facilities.new.map((val)=> ({
            storeId: store.id,
            facilityId: val
        }));
        const mappedNewCategories = categories.new.map((val)=> ({
            storeId: store.id,
            storeCategoryId: val
        }));
        try {
            await Promise.all([
                StoreCategory.query().del().whereIn(
                                                "storeCategoryId",
                                                categories.removed)
                                            .where("storeId", store.id),
                StoreCategory.query().insert(mappedNewCategories),
                StoreFacility.query().del().whereIn(
                                                "facilityId",
                                                facilities.removed)
                                            .where("storeId", store.id),
                StoreFacility.query().insert(mappedNewFacilities)
            ]);
            const result = await Store.query().where({id: store.id})
                                                        .patch(store);
            return result;
        }
        catch (err){
            throw err;
        }
    }

    async removeStore(id: number) {
        try {
            await Store.query().where("id", id).patch({deleted: false});
            return { success: true };
        } catch (err) {
            throw err;
        }
    }

    // Retrieve all store list
    async getStore(){
        try {
            let result = await Store.query().select(
                "store.id",
                "provinceName",
                "storeName",
                "storePicture",
                "storeLat",
                "storeLng",
                "storeLocation",
                "storeOpenTime",
                "storeCloseTime")
            .where("deleted", false)
            .withGraphFetched("category")
            .modifyGraph("category", b => { 
                b.select([
                    {id:"storeCategoryId"},
                    "storeCategoryName"
                ]).innerJoin(
                    "mStoreCategory",
                    "mStoreCategory.id",
                    "=",
                    "storeCategory.storeCategoryId"
                ); //builders
            })
            .withGraphFetched("facility")
            .modifyGraph("facility", b => {
                b.select([{id: "facilityId"}, "facilityName", "facilityIcon"])
                    .join("mFacility", "mFacility.id", 
                            "=", "storeFacility.facilityId");
            })
            .join("m_province", "m_province.id", "=", "store.provinceId");
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getStoreByPage(page: number, size: number){
        try {
            let result = await Store.query().select(
                "store.id",
                "provinceName",
                "storeName",
                "storePicture",
                "storeLat",
                "storeLng",
                "storeLocation",
                "storeOpenTime",
                "storeCloseTime")
            .where("deleted", false)
            .withGraphFetched("category")
            .modifyGraph("category", b => {
                b.select([
                    {id:"storeCategoryId"}, 
                    "storeCategoryName"
                ]).innerJoin(
                    "mStoreCategory",
                    "mStoreCategory.id",
                    "=",
                    "storeCategory.storeCategoryId"
                );
            })
            .withGraphFetched("facility")
            .modifyGraph("facility", b => {
                b.select([{id: "facilityId"}, "facilityName", "facilityIcon"])
                    .join("mFacility", "mFacility.id", "=", 
                            "storeFacility.facilityId");
            })
            .join("m_province", "m_province.id", "=", "store.provinceId")
            .page(page, size);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getStoreById(id: number){
        try {
            const result = await Store.query().select(
                "store.id",
                "provinceId",
                "storeName",
                "storePicture",
                "storeLat",
                "storeDescription",
                "storeLocation",
                "storeTax",
                "storeServiceFee",
                "storePhone",
                "storeLng",
                "userEmail",
                "storeOpenTime",
                "storeCloseTime")
            .where("store.id", id)
            .where("store.deleted", false)
            .withGraphFetched("category")
            .modifyGraph("category", b => {
                b.select([
                    {id:"storeCategoryId"}, 
                    "storeCategoryName"
                ]).innerJoin(
                    "mStoreCategory",
                    "mStoreCategory.id",
                    "=",
                    "storeCategory.storeCategoryId"
                );
            })
            .withGraphFetched("facility")
            .modifyGraph("facility", b => {
                b.select([{id: "facilityId"}, "facilityName", "facilityIcon"])
                    .join("mFacility", "mFacility.id", "=", 
                            "storeFacility.facilityId");
            })
            .join("users", "users.id", "=", "store.ownerId")
            .first();
            if (typeof result === "undefined" || result === null) { 
                throw new AppError("store_not_found");
            };
            return result;
        } catch (err) {
            throw err;
        }
    }


    // Add User to Store
    async addUserToStore(
        userName: string, 
        userPin: string, 
        storeId: number, 
        role: "admin" | "owner" | "cashier" 
        ){
            try {
                userPin = await bcrypt.hash(userPin, 10);
                await StoreUser.query().insert({
                    storeId,
                    storeUserName: userName,
                    storeUserPin: userPin,
                    storeUserRole: role
                });
                return { success: true };
            } catch (err) {
                throw err;
            }
    }

    async changeUserRole(
        id: number, role: "admin" | "owner" | "cashier") {
            try {
                await StoreUser.query()
                    .where({id})
                    .patch({storeUserRole: role});
            } catch (err) {
                throw err;
            }
    }

    async removeUserFromStore(id: number){
        try {
            await StoreUser.query().where({id})
            .patch({deleted: true});
            return { success: true };
        } catch (err) {
            throw err;
        }
    }

    async getStoreGallery(storeId: number){
        try {
            const result = await StoreGallery.query()
                                                .select([
                                                    "id",
                                                    "mediaPath",
                                                    "mediaType"
                                                ])
                                                .where("storeId", storeId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async addStoreMedia(media: any) {
        try {
            const result = await StoreGallery.query()
                                                .insert(media);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async removeStoreMedia(id: number) {
        try {
            const media = await StoreGallery.query()
                                                .select([
                                                    "mediaPath",
                                                    "mediaType"
                                                ])
                                                .where("id",id)
                                                .first();
            if (typeof media === "undefined") {
                throw new AppError("media_not_found");
            }
            if (fs.existsSync("public"+media.mediaPath)) {
                fs.unlinkSync("public"+media.mediaPath);
            };
            await StoreGallery.query().del().where("id",id);
            return id;
        } catch (err) {
            throw err;
        }
    }


    // Mobile Service
    async getNearestStore(lat: number, lng: number) {
        // const date = new Date();
        // const time = `${date.getHours()}:${date.getMinutes()}`;
        const distanceQuery = `( 6371 * acos( cos( radians(${lat}) ) * 
        cos( radians( store_lat ) ) * cos( radians( store_lng ) - 
        radians(${lng}) ) + sin( radians(${lat}) ) * 
        sin( radians( store_lat ) ) ) )`;
        try {
            const result = await Store.query().select(
                "store.id",
                "storeName",
                "storePicture",
                "storeOpenTime",
                "storeCloseTime",
                raw(distanceQuery).as("distance"))
            .where("store.deleted", false)
            // .where("storeOpenTime", "<=", time)
            // .where("storeCloseTime", ">=", time)
            .orderBy("distance", "ASC")
            .limit(15);
            if (typeof result === "undefined" || result === null) { 
                throw new AppError("store_not_found");
            };
            return result;
        } catch (err) {
            throw err;
        }
    }


    // To be implemented
    async getTopStore(lat: number, lng: number) {
        // const date = new Date();
        // const time = `${date.getHours()}:${date.getMinutes()}`;
        const distanceQuery = `( 6371 * acos( cos( radians(${lat}) ) * 
        cos( radians( store_lat ) ) * cos( radians( store_lng ) - 
        radians(${lng}) ) + sin( radians(${lat}) ) * 
        sin( radians( store_lat ) ) ) )`;
        try {
            const result = await Store.query().select(
                "store.id",
                "storeName",
                "storePicture",
                "storeOpenTime",
                "storeCloseTime",
                raw(distanceQuery).as("distance")
                )
            .where("store.deleted", false)
            // .where("storeOpenTime", "<=", time)
            // .where("storeCloseTime", ">=", time)
            .orderBy("distance", "ASC")
            .limit(15);
            if (typeof result === "undefined" || result === null) { 
                throw new AppError("store_not_found");
            };
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getStoreByName(name: string, lat: number, lng: number) {
        const distanceQuery = `( 6371 * acos( cos( radians(${lat}) ) * 
        cos( radians( store_lat ) ) * cos( radians( store_lng ) - 
        radians(${lng}) ) + sin( radians(${lat}) ) * 
        sin( radians( store_lat ) ) ) )`;
        try {
            const result = await Store.query().select(
                "store.id",
                "storeName",
                raw(distanceQuery).as("distance"),
                "storePicture",
                "storeOpenTime",
                "storeCloseTime")
            .withGraphFetched("category")
            .modifyGraph("category", b => {
                b.select([
                    {id:"storeCategoryId"}, 
                    "storeCategoryName"
                ]).innerJoin(
                    "mStoreCategory",
                    "mStoreCategory.id",
                    "=",
                    "storeCategory.storeCategoryId"
                );
            })
            .withGraphFetched("facility")
            .modifyGraph("facility", b => {
                b.select([{id: "facilityId"}, "facilityName", "facilityIcon"])
                    .join("mFacility", "mFacility.id", "=", 
                            "storeFacility.facilityId");
            })
            .where("storeName","like", `%${name}%`)
            .orderBy("distance", "ASC");
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getStoreByIdMobile(id: number) {
        try {
            const result = 
                await Store.query().select(
                    "id",
                    "storeCloseTime",
                    "storeDescription",
                    "storeLocation",
                    "storeName",
                    "storeOpenTime",
                    "storePhone",
                    "storePicture",
                    "storeServiceFee",
                    "storeTax",
                )
            .withGraphFetched(`[
                category(storeCategories),
                facility(storeFacilities),
                menu(allMenu),
                menu(promoMenu) as promoMenu,
                menu(tes) as tes
            ]`)
            .modifiers({
                storeCategories(b) {
                    b.select([
                        {id:"storeCategoryId"}, 
                        "storeCategoryName"
                    ]).innerJoin(
                        "mStoreCategory",
                        "mStoreCategory.id",
                        "=",
                        "storeCategory.storeCategoryId"
                    );
                },
                storeFacilities(b) {
                    b.select([
                        {id: "facilityId"}, "facilityName", "facilityIcon"])
                    .join("mFacility", "mFacility.id", "=", 
                            "storeFacility.facilityId");
                },
                allMenu(b) {
                    b.select(
                        "id",
                        "menuName",
                        "menuPhoto",
                        "menuPrice",
                        "menuStock",
                        "menuDescription",
                        "isDiscount",
                        "menuDiscountValue",
                        "menuDiscountType"
                    ).where("deleted", false);
                },
                promoMenu(b) {
                    b.select(
                        "id",
                        "menuName",
                        "menuPhoto",
                        "menuPrice",
                        "menuStock",
                        "menuDescription",
                        "isDiscount",
                        "menuDiscountValue",
                        "menuDiscountType")
                    .where("isDiscount", true)
                    .where("deleted", false);
                },
                tes(b) {
                    b.avg("menuPrice as avg")
                        .min("menuPrice")
                        .max("menuPrice")
                        .groupBy("storeId");
                }
            })
            .findById(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
