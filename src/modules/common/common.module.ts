import { FireBaseModule } from "../firebase/firebase.module";
import { CommonService } from "./common.service";
import { Module } from "@nestjs/common";


@Module({
    imports: [FireBaseModule],
    providers: [CommonService],
    exports: [CommonService],
})

export class CommonModule {}