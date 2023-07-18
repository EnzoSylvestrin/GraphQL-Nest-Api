import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';

import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignResponse } from './dto/sign-response';
import { SignInInput } from './dto/signin-input';
import { LogoutResponse } from './dto/logout-response';

@Resolver(() => Auth)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => SignResponse)
    signIn(@Args('signInInput') signInInput: SignInInput) {
        return this.authService.signIn(signInInput);
    }

    @Mutation(() => SignResponse)
    signUp(@Args('signUpInput') signUpInput: SignUpInput) {
        return this.authService.singUp(signUpInput);
    }

    @Mutation(() => LogoutResponse)
    logout(@Args('id', { type: () => Int }) id: number) {
        return this.authService.logout(id);
    }

    @Query(() => Auth, { name: 'auth' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.authService.findOne(id);
    }
}
