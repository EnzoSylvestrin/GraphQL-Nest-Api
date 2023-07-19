import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';

import { NewTokenResponse } from './dto/newTokens-response';
import { LogoutResponse } from './dto/logout-response';
import { SignResponse } from './dto/sign-response';
import { SignUpInput } from './dto/signup-input';
import { SignInInput } from './dto/signin-input';

import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { Public } from './decorators/public.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Resolver(() => Auth)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Mutation(() => SignResponse)
    signIn(@Args('signInInput') signInInput: SignInInput) {
        return this.authService.signIn(signInInput);
    }

    @Public()
    @Mutation(() => SignResponse)
    signUp(@Args('signUpInput') signUpInput: SignUpInput) {
        return this.authService.singUp(signUpInput);
    }

    @Mutation(() => LogoutResponse)
    logout(@Args('id', { type: () => Int }) id: number) {
        return this.authService.logout(id);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Mutation(() => NewTokenResponse)
    getNewTokens(
        @CurrentUserId() userId: number,
        @CurrentUser('refreshToken') refreshToken: string,
    ) {
        return this.authService.getNewTokens(userId, refreshToken);
    }

    @Query(() => String)
    hello() {
        return 'hello';
    }
}
