// identityProviderBean.ts
export interface IdentityProvider {
    alias: string;
    displayName: string;
    internalId: string;
    providerId: string;
    enabled: boolean;
    loginUrl: string;
    iconClasses?: string;
}

export interface IdentityProviderBean {
    providers: IdentityProvider[];
}
