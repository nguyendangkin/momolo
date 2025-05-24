import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Kiểm tra xem user đã tồn tại chưa (ví dụ: qua email)
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email này đã được đăng ký');
      }

      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi tạo người dùng');
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi khi lấy danh sách người dùng',
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi tìm người dùng');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      // Tìm user theo ID
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
      }

      // Cập nhật thông tin
      user.name = updateUserDto.name || user.name;
      user.email = updateUserDto.email || user.email;

      // Lưu lại
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      throw new InternalServerErrorException('Lỗi khi cập nhật người dùng');
    }
  }

  async remove(id: number) {
    try {
      // Kiểm tra user có tồn tại không
      await this.findOne(id);

      const result = await this.usersRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
      }

      return { message: `Đã xóa thành công người dùng với ID ${id}` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi xóa người dùng');
    }
  }
}
