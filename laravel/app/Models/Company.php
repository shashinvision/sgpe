<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    public $table = 'companys'; // para especificar la tabla en la BBDD

    protected $fillable = [
        'name',
        'state',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
