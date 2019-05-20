import { NextFunction, Response, Request } from 'express'
import sequelize from 'sequelize'

interface IResponse extends Response {
  data?: any
}
interface IRequest extends Request {
  session?: any
}

export type RouteFunction = (req: IRequest, res: IResponse, next: NextFunction) => void

export type Model<TInstance, TAttributes> = sequelize.Model<TInstance, TAttributes>
