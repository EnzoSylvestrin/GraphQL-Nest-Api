import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtPayloadRefreshToken } from '../types';

export const CurrentUser = createParamDecorator(
    (
        data: keyof JwtPayloadRefreshToken | undefined,
        context: ExecutionContext,
    ) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        if (data) {
            return req.user[data];
        }

        return req.user;
    },
);
