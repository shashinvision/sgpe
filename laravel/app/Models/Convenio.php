<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Convenio extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_company_convenio',
        'created_by_user_id',
        'approved_by_user_id',
        'disapproved_by_user_id',
        'edit_by_user_id',
        'companys_id',
        'states_id',
        'document_path',
        'date_start',
        'date_end',
        'state',
    ];


    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
