<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BaseController extends Controller
{
    public function home() {

        $groups = Event::all()->groupBy('title');

        $id_count = 1;

        $group_list = [];

        foreach ($groups as $key => $value) {
           array_push($group_list, ['id' => $id_count, 'title' => $key]);
           $id_count++;
        }
  
        $events = Event::all()->map(function($event){
            return [
                'id' => $event->id,
                'group' => 0,
                'title' =>  $event->description,
                'event_title' => $event->title,
                'event_description' => $event->description,
                'event_start_time' => $event->end_date,
                'event_end_time' => $event->start_date,
                'start_time' => $event->start_date,
                'end_time' => $event->end_date
            ];
        });

        return Inertia::render('Home', ['events' => $events, 'groups' => $group_list]);
    }
}
