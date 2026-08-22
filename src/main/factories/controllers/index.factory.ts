import { Controller } from "../../controller";

export function factoryController<T>(controller: Controller<T>) {
    return controller.execute.bind(controller);;
}