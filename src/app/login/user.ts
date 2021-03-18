export class User {   

    constructor(name: string, surname: string, accessToken: string, refreshToken: string, expiresAt: string, profilePicture: string) {
        this._name = name
        this._surname = surname
        this._accessToken = accessToken
        this._refreshToken = refreshToken
        this._expiresAt = new Date(expiresAt)
        this._profilePicture = profilePicture
        // todo placeholder
        this._id = '32565276'
    }

    private _id: string;
    public get id() {
        return this._id;
    }

    private _name: string;
    public get name() {
        return this._name;
    }

    private _surname: string;
    public get surname() {
        return this._surname;
    }

    private _accessToken: string;
    public get accessToken() {
        return this._accessToken;
    }

    private _refreshToken: string;
    public get refreshToken() {
        return this._refreshToken;
    }

    private _expiresAt: Date;
    public get expiresAt()    {
        return this._expiresAt;
    }

    private _profilePicture: string;
    public get profilePicture() {
        return this._profilePicture;
    }
}