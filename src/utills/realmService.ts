import Realm from 'realm';
import Ride from '../models/Ride';

const getRealm = async () => {
    return Realm.open({
        schema: [Ride.schema],
        schemaVersion: 1,
    });
};

export const addRides = async (rides: { id: string; name: string; price: number; image: string }[]) => {
    const realm = await getRealm();
    realm.write(() => {
        rides.forEach((ride) => {
            // Check if the ride already exists
            const existingRide = realm.objectForPrimaryKey('Ride', ride.id);
            if (existingRide) {
                // Update existing ride
                existingRide.name = ride.name;
                existingRide.price = ride.price;
                existingRide.image = ride.image;
            } else {
                // Add new ride
                realm.create('Ride', ride);
            }
        });
    });
};

export const fetchRides = async () => {
    const realm = await getRealm();
    return realm.objects<Ride>('Ride').toJSON(); // Convert results to JSON for easier handling
};
