import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { Auth } from './entities/auth.entity';

import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignResponse } from './dto/sign-response';

@Resolver(() => Auth)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => [Auth], { name: 'auth' })
    findAll() {
        return this.authService.findAll();
    }

    @Query(() => Auth, { name: 'auth' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.authService.findOne(id);
    }

    @Mutation(() => SignResponse)
    signUp(@Args('signUpInput') signUpInput: SignUpInput) {
        return this.authService.singUp(signUpInput);
    }

    @Mutation(() => Auth)
    updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
        return this.authService.update(updateAuthInput.id, updateAuthInput);
    }

    @Mutation(() => Auth)
    removeAuth(@Args('id', { type: () => Int }) id: number) {
        return this.authService.remove(id);
    }
}