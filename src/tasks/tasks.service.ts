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
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto)
    }
    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found
    }
    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto)
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
    //     this.tasks.push(task);
    //     return task
    // }
    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    async updataTaskStatus(id: string, status: TaskStatus) {
        const task = await this.getTaskById(id);

        task.status = status;
        await this.tasksRepository.save(task);

        return task;
    }
}
