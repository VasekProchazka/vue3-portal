export interface Transport {
    to: string;
    from: string;
    order: number;
    passengers: Record<string, unknown>;
}
