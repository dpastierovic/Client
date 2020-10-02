export class User {   

    constructor(name: string, surname: string, accessToken: string, refreshToken: string, expiresAt: string, profilePicture: string) {
        this._name = name
        this._surname = surname
        this._accessToken = accessToken
        this._refreshToken = refreshToken
        this._expiresAt = new Date(expiresAt)
        this._profilePicture = profilePicture
    }

    _name: string
    public get name() {
        return this._name;
    }

    _surname: string
    public get surname() {
        return this._surname;
    }

    _accessToken: string
    public get accessToken() {
        return this._accessToken;
    }

    _refreshToken: string
    public get refreshToken() {
        return this._refreshToken;
    }

    _expiresAt: Date
    public get expiresAt()    {
        return this._expiresAt;
    }

    _profilePicture: string
    public get profilePicture() {
        return this._profilePicture;
    }
}