import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI';
        /* color: ${({ theme }) => theme.colors.main} */
    }

    body {
        background: linear-gradient(
            to right,
            ${({ theme }) => theme.colors.grey.light},
            5%,
            ${({ theme }) => theme.colors.green.dark},
            95%,
            ${({ theme }) => theme.colors.grey.light}
        );
        /* background: url("../../img/bg.jpg") no-repeat center center cover; */
    }

    .container {
        max-width: 1700px;
        margin: auto;
        overflow: hidden;
        padding: 0 2rem;
        margin-top: 6rem;
        margin-bottom: 3rem;
    }

    .alerts{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
`;

export default GlobalStyles;
