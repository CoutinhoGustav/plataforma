import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';

@Injectable()
export class TurmasService {
    constructor(
        @InjectRepository(Turma)
        private readonly repository: Repository<Turma>,
    ) { }

    create(createDto: any) {
        const record = this.repository.create(createDto);
        return this.repository.save(record);
    }

    findAll() {
        return this.repository.find({
            order: { data: 'DESC' }
        });
    }

    findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    async update(id: string, updateDto: any) {
        await this.repository.update(id, updateDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const record = await this.findOne(id);
        if (record) {
            return this.repository.remove(record);
        }
    }
}
