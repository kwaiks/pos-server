export default function limitedAssign<T extends S,S>
    (source: T, destination: S): void {
        for (let prop in destination) {
            if (source[prop] && destination.hasOwnProperty(prop)) {
                destination[prop] = source[prop];
            }
        }
}