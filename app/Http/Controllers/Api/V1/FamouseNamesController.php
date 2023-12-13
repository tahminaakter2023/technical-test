<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\FamousNameRequest;
use App\Http\Resources\FamousNameCollection;
use App\Http\Resources\FamousNameResource;
use App\Models\FamousName;

class FamouseNamesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $famousNames = FamousName::all();
        return response()->json(new FamousNameCollection($famousNames));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FamousNameRequest $request)
    {
        $data = $request->validated();
        $famousName = FamousName::create($data);
        return response()->json(new FamousNameResource($famousName), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(FamousName $famousName)
    {
        return response()->json(new FamousNameResource($famousName));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FamousNameRequest $request, FamousName $famousName)
    {
        $data = $request->validated();
        $famousName->fill($data);
        $famousName->save();
        return response()->json(new FamousNameResource($famousName), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FamousName $famousName)
    {
        $famousName->delete();
        return response()->json(null, 204);
    }
}
