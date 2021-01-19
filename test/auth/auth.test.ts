import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/server";


chai.use(chaiHttp);

let token = null;
let refreshToken = null;

describe("Login Test", () => {
    it("should've logged in with token", (done) => {
        chai.request(server)
        .post("/auth/login")
        .send({
            email: "admin@mesan.com",
            password: "adminpassword"
        })
        .end((_err, res)=>{
            expect(res.status).equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body.success).equal(true);
            expect(res.body.token).to.be.a("string");
            expect(res.body.refreshToken).to.be.a("string");
            token = res.body.token;
            refreshToken = res.body.refreshToken;
            done();
        });
    });
});
