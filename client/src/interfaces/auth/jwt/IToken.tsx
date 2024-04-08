/**
 * Represents a token object containing a JWT token.
 */
interface IToken {
    /**
     * The JWT token string.
     */
    token: string | null;
}

export default IToken;
