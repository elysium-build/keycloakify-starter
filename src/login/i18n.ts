import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        "home-idp-discovery-identity-provider-login-label": "Select your home identity provider"
    },
    de: {
        "home-idp-discovery-identity-provider-login-label": "W�hlen Sie ihren Heimat-Identit�tsanbieter"
    }
});

export type I18n = typeof ofTypeI18n;
