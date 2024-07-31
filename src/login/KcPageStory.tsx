import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import type { KcContext } from "./KcContext";
import KcPage from "./KcPage";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContextExtension, KcContextExtensionPerPage } from "./KcContext";
import { themeNames, kcEnvDefaults } from "../kc.gen";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {
    "hidpd-select-idp.ftl": {
        hidpd: {
            providers: [
                {
                    alias: "example1",
                    displayName: "example1",
                    internalId: "example1",
                    providerId: "example1",
                    enabled: true,
                    loginUrl: "https://someurl.com/login",
                    iconClasses: "",
                }
            ]
        },
        url: {
            loginResetCredentialsUrl: "",
            registrationUrl: ""
        },
        realm: {
            loginWithEmailAllowed: false,
            rememberMe: false,
            password: false,
            resetPasswordAllowed: false,
            registrationAllowed: false,
        },
        auth: {
            selectedCredential: "",
        },
        registrationDisabled: true,
        login: {
            username: "",
            rememberMe: "false",
            password: "",
        },
        usernameHidden: true,
        social: {
            displayInfo: true,
            providers: [],
        }
    }

};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {
    const { pageId } = params;

    function KcPageStory(props: {
        kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }) {
        const { kcContext: overrides } = props;

        const kcContextMock = getKcContextMock({
            pageId,
            overrides
        });

        return <KcPage kcContext={kcContextMock} />;
    }

    return { KcPageStory };
}
