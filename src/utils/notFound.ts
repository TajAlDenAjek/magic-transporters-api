import { Response, Request } from "express"

const notFound = async (req: Request, res: Response) => {
    res.status(404).send('<h1>404 <br> Route does not exist</h1>')
}

export default notFound