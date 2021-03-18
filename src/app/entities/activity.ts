export class Activity {

    constructor(athleteId: string, name: string, polyline: string, date: string, renamed: boolean) {
        this._athleteId = athleteId;
        this._name = name;
        this._polyline = polyline;
        this._renamed = renamed;
        this._date = new Date(date);
    }

    //todo activity id and type

    private _athleteId : string;
    public get athleteId() {
        return this._athleteId;
    }

    private _name : string;
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
        this._renamed = true;
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
}