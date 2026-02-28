import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    serviceType: ServiceType;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phoneNumber: string;
}
export type Time = bigint;
export enum ServiceType {
    housekeeping = "housekeeping",
    construction = "construction",
    security = "security",
    medical = "medical"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getInquiryByTimestamp(timestamp: Time): Promise<Inquiry>;
    submitInquiry(name: string, phoneNumber: string, email: string, serviceType: ServiceType, message: string): Promise<void>;
}
