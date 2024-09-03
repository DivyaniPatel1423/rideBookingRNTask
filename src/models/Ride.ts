import Realm from 'realm';

class Ride extends Realm.Object<Ride> {
    id!: string;
    name!: string;
    price!: number;
    image!: string;

    static schema = {
        name: 'Ride',
        primaryKey: 'id',
        properties: {
            id: 'string',
            name: 'string',
            price: 'float',
            image: 'string',
        },
    };
}

export default Ride;
