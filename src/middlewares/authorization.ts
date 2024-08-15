/**
 * Authorizes user request
 * @param req:FastifyRequest
 */
export async function authorization(req: ) {
    try {
        const jwt = req.headers.authorization;
        const cli = new AuthorizationClient(jwt);
        const walletId = await cli.authorize();
        req.session = { walletId };
        return true;
    } catch (error) {
        if (error instanceof AxiosError) throw HttpException.unauthorized();
    }
}
