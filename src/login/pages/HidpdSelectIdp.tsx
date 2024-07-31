import { ClassKey, getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function HidpdSelectIdp(props: PageProps<Extract<KcContext, { pageId: "hidpd-select-idp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg } = i18n;

    const {realm, messagesPerField,registrationDisabled, hidpd } = kcContext;

    let ulclassName = '';
    let linkClassName = '';

    if (hidpd.providers.length > 3) {
        ulclassName = kcClsx("kcFormSocialAccountListClass") + " " + kcClsx("kcFormSocialAccountListGridClass");
        linkClassName = kcClsx("kcFormSocialAccountListButtonClass") + " " + kcClsx("kcFormSocialAccountGridItem")
    } else {
        ulclassName = kcClsx("kcFormSocialAccountListClass")
        linkClassName = kcClsx("kcFormSocialAccountListButtonClass")
    }

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={realm.password && realm.registrationAllowed && !(registrationDisabled?? false)}
            displayMessage={!messagesPerField.existsError('username')}
            headerNode={
                <h1>{msg("loginAccountTitle")}</h1>
            }
        >
            {/* <#if realm.password && hidpd.providers??> */}
            {(realm.password && (hidpd.providers?? false)) && (
                <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")} style={{ fontSize: "16px" }}>
                    <hr/>
                    <h4>{msg("home-idp-discovery-identity-provider-login-label")}</h4>

                    <ul className={ulclassName}>
                        {hidpd.providers.map((p) => (
                            <a key={p.alias} id={`social-${p.alias}`} className={linkClassName}
                                    type="button" href={p.loginUrl}>
                                {p.iconClasses && p.iconClasses.trim() ? (
                                <>
                                    <i className={kcClsx("kcCommonLogoIdP")+" "+kcClsx(p.iconClasses as ClassKey)} aria-hidden="true"></i>
                                    <span className={kcClsx("kcFormSocialAccountNameClass")+ " kc-social-icon-text"}>{p.displayName || ''}</span>
                                </>
                                ) : (
                                    <span className={kcClsx("kcFormSocialAccountNameClass")}>{p.displayName || ''}</span>
                                )}
                            </a>
                        ))}
                        {/* </#list> */}
                    </ul>
                </div>
            )}
        {/* </#if> */}
            {/* // Page code goes here */}
        </Template>
    );
}