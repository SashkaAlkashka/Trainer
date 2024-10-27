import { Body, Controller, Put, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SettingService } from "./setting.service";
import { UpdateUserDto } from "src/users/dto/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesAuthGuard } from "src/auth/roles-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";

@ApiTags('Настройки')
@Controller('setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @UseGuards(JwtAuthGuard)  // Используем Guard для защиты маршрута
    @Roles('user')
    @UseGuards(RolesAuthGuard)
    @ApiBearerAuth('access-token')  // Указываем, что эндпоинт требует Bearer токен
    @Put('/settings') 
    async updateName(@Body() updateUserDto: UpdateUserDto) {
        return this.settingService.updateUser(updateUserDto); 
    }
}
