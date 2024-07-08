<?php

namespace Domain\Facades\TestFacade;

use Illuminate\Support\Facades\Facade;
use Domain\Services\TestService\TestService;

class TestFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return TestService::class;
    }
}
