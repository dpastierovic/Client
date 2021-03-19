import { ActivityType } from "./activity-type";

export class Activity {

    constructor(id: string, athleteId: string, name: string, type: string, polyline: string, date: string, renamed: boolean) {
        this._id = id;
        this._athleteId = athleteId;
        this._name = name;
        this._polyline = polyline;
        this._renamed = renamed;
        this._date = new Date(date);

        switch(type) {
            case 'Ride': {
                this._type = ActivityType.Ride;
                break;
            }
            case 'VirtualRide': {
                this._type = ActivityType.VirtualRide;
                break;
            }
            case 'Run': {
                this._type = ActivityType.Run;
                break;
            }
            case 'Hike': {
                this._type = ActivityType.Hike;
                break;
            }
            case 'Walk': {
                this._type = ActivityType.Walk;
                break;
            }
            default: {
                this._type = ActivityType.Other;
            }
        }

        console.log(this);
    }

    private _id: string;
    public get id() {
        return this._id;
    }

    private _athleteId: string;
    public get athleteId() {
        return this._athleteId;
    }

    private _name: string;
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
        this._renamed = true;
    }

    private _type: ActivityType;
    public get type() {
        return this._type;
    }

    private _polyline : string;
    public get polyline() {
        return this._polyline;
    }

    private _date: Date;
    public get date() {
        return this._date;
    }

    private _renamed : boolean;
    public get renamed() {
        return this._renamed;
    }
    
    public toJSON(): string {
        let obj: any = {};
    
        for (let key in this) {
            if (key[0] === '_') {
                if (key === '_date') {
                    obj[key.substring(1)] = this._date.toUTCString();
                }
                else {
                    obj[key.substring(1)] = this[key];
                }
            }
        }
    
        return JSON.stringify(obj);
    }
}