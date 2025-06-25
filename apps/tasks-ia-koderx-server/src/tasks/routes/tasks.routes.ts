export const version = "v1";
export const main = "/tasks";

export const tasksRoutes = {
    get_tasks_user: `/tasks/:term`,
    post_tasks: `/tasks`,
    patch_tasks: `/tasks/:id`,
    delete_tasks: `/tasks/:id`,
    get_task: `/task/:id`,
    get_task_id_app: `/task/search/:idapp`,
    assign_task_aditional: `/assign-aditional/:id`,
}