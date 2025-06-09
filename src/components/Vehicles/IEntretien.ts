export interface IEntretien {
    Acteur: "Natalino" | "Lucien" | "Pougeux";
    Type: "Pneu" | "Vidange" | "Control technique" | "Autre";
    PrevuLe?: string;
    PrevuA?: number;
    RealiséLe?: string;
    RealiseA?: number;
}