import {pool} from '../database/connection';
import {TaskStatus} from '../types';


export default class TaskManagerService {
  addTask = async (addTaskData: { title: string; description: string; }): Promise<void> => {
    const {title, description} = addTaskData;
    const sql = `INSERT INTO tasks (title, description, status) VALUES `+
      `('${title}', '${description}', '${TaskStatus.Open}')`;
    await pool.execute(sql);
  };

  getTasks = async (getTasksData: { seed: number; count: number; }): Promise<any> => {
    const seed = getTasksData.seed ?? 0;
    const count = getTasksData.count ?? 10;
    const [rows] = await pool.execute(
        `SELECT * FROM tasks  ORDER BY ID ASC LIMIT ${count} OFFSET ${seed}`
    );
    return rows;
  };

  updateTask = async (id: string,
      addTaskData: { title: string; description: string; status: TaskStatus; }
  ): Promise<void> => {
    const {title, description, status} = addTaskData;
    await pool.execute(`UPDATE tasks SET title = '${title}', `+
        `description = '${description}', status = '${status}' WHERE ID = '${id}'`);
  };

  getTasksMetrics = async (): Promise<any> => {
    const sql = `SELECT JSON_OBJECT('open', COUNT(CASE WHEN status = 'open' THEN 1 END),`+
    ` 'in-progress', COUNT(CASE WHEN status = 'in-progress' THEN 1 END),`+
    ` 'completed', COUNT(CASE WHEN status = 'completed' THEN 1 END)) AS metrics FROM tasks`;
    const [rows] = await pool.execute(sql);
    return rows?.[0];
  };

  getTaskById = async (id: string): Promise<any> => {
    const [rows] = await pool.execute(`SELECT * FROM tasks WHERE ID = '${id}'`);
    return rows;
  };

  deleteTaskById = async (id: string): Promise<void> => {
    await pool.execute(`DELETE * FROM tasks WHERE ID = '${id}'`);
  };
}
