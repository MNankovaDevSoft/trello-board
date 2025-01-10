import {makeObservable} from "mobx";
import DashboardStore from "./Dashboard.store";

export default class RootStore {
    public dashboard: DashboardStore;
    constructor() {
        this.dashboard = new DashboardStore(this);
        makeObservable(this);
    }
}
