<?php

namespace Domain\Services\TestService;

use App\Models\Test;

class TestService
{
    protected $test;

    public function __construct()
    {
        $this->test = new Test();
    }

    public function get(int $test_id)
    {
        return $this->test->find($test_id);
    }

    public function create(array $data)
    {
       return $this->test->create($data);
    }

    public function read($id)
    {
        // Implement read functionality
    }

     protected function edit(Test $test, array $data)
    {
        return array_merge($test->toArray(), $data);
    }

    public function update($test_id , array $data)
    {
        $test = $this->test->find($test_id);
        return $test->update($this->edit($test, $data));
    }

    public function delete($id)
    {
       $test = $this->test->find($id);
       return $test->delete();
    }

    public function list()
    {
       return $this->test->all();
    }
}
