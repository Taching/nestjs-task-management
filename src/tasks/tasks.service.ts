import { TasksRepository } from './tasks.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ){}
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto;

    //     let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     if(search) {
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes((search))) {
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }
    //     return tasks;
    // }
    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found
    }
    // getTaskById(id: string): Task {

    //     const found =  this.tasks.find((task) => task.id === id);
    //     if(!found) {
    //         throw new NotFoundException();
    //     }
    //     return found;
    // }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;

        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.tasksRepository.save(task);
        return task
    }
    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task);
    //     return task
    // }
    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    // updataTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
