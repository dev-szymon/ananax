import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 
:root {
  /* ------------ */
  /* typography */
  --fontPrimary: Lato, -apple-system, BlinkMacSystemFont, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --typographyHeader1: normal 500 2rem/137.5% var(--fontPrimary);
  --typographyHeader2: normal 500 1.5rem/137.5% var(--fontPrimary);
  --typographyHeader3: normal 500 1.25rem/137.5% var(--fontPrimary);
  --typographySubtitle: normal 400 1.25rem/137.5% var(--fontPrimary);
  --typographyBody: normal 400 1rem/137.5% var(--fontPrimary);
  --typographyButton: normal 500 1rem/137.5% var(--fontPrimary);
  --typographyBold: 700;
  --typographySmall: normal 400 0.875rem/142.5% var(--fontPrimary);
  --typographySmaller: normal 400 0.725rem/142.5% var(--fontPrimary);
  --typographySmallBold: normal 500 0.875rem/142.5% var(--fontPrimary);
  /* ------------ */

  /* ------------ */
  /* colors */
  --colorPrimary: #15c96e;
  --colorPrimary75: #50D692;
  --colorPrimary25: #c5f1db;
  --colorSecondary: #f7991f;
  --colorAccent: #5d5fef;
  --colorAccent25: #a5a6f6;
  --colorDark: #234232;
  --colorText: #03160d;
  --colorSecondaryText: #456956;
  --colorTextLight: #68927e;
  --colorError: #eb1044;
  --colorDim: #ecf1f4;
  --colorLight: #fafcfe;
  --colorWhite: #ffffff;
  /* ------------ */

  /* shadows */
  --lightShadow: 0px 2px 4px -1px var(--colorDim);
  /*  */
  
  --colorDisabled: #e1dfe9;
  --colorOutline: rgb(96, 128, 244);
  --lengthSm1: 0.25rem;
  --lengthSm2: 0.5rem;
  --lengthSm3: 0.75rem;
  --lengthSm4: 0.875rem;
  --lengthMd1: 1rem;
  --lengthMd2: 1.25rem;
  --lengthMd3: 1.5rem;
  --lengthLg1: 2rem;
  --lengthLg2: 3rem;
  --lengthLg3: 4rem;
  --boxShadow: 0 8px 16px 0px rgba(0, 0, 0, 0.2);
  --boxShadowAccent: 0 8px 16px 0px rgba(21, 201, 110, 0.4);
  --boxShadowSmoothOutline: 0 4px 8px 0px var(--colorAccent25);
  --boxShadowOutline: 0 0px 8px 2px var(--colorAccent25);
}

html,
body {
  font-family: var(--fontPrimary);
  background-color: var(--colorLight);
  line-height: 137.5%;
  color: var(--colorText);
}

h1 {
  font: var(--typographyHeader1);
  margin-bottom: 1rem;
}

h2 {
  font: var(--typographyHeader2);
  margin-bottom: 1rem;
}

h3 {
  font: var(--typographyHeader3);
  margin-bottom: 0.5rem;
}

ol,
ul {
  list-style: none;
}

a {
  color: var(--colorAccent);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

fieldset {
  background-color: none;
  border: none;
  max-width: 100%;
}

fieldset:disabled {
  opacity: 0.5;
}
`;

export default GlobalStyle;