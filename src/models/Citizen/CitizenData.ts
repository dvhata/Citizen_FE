import { Moment } from "moment";

export class CitizenData {
    id?: string;
    name?: string;
    ID_number?: string;
    date_of_birth?: Moment;
    gender?: number;
    hometown?: string;
    permanent_address?: string;
    temporary_address?: string;
    religion?: string;
    education_level?: string;
    job?: string;
}
