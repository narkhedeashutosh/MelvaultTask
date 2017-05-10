from django.contrib import auth
from django.contrib.auth.models import User, Group
from django.db.models import Q, Avg, Max, Min, Sum
from django.shortcuts import HttpResponse, render_to_response, HttpResponseRedirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render
from MelvaultTask.settings import *
import json
import requests
import psutil
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import JsonResponse

def landing_page(request):
    return render(request, "landing_page.html")

def get_neft_data(request):
    response = requests.get('https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json')
    foo = json.loads(response.text)['data']
    return JsonResponse({ "data": foo,"status": True })

def get_cpu_data(request):
    cpu_stats=psutil.cpu_stats()
    return JsonResponse({ "cpuData": {"cpuStats": {'interrupts':cpu_stats.interrupts,
                                        'ctxSwitches':cpu_stats.ctx_switches,
                                        'softInterrupts':cpu_stats.soft_interrupts,
                                        'syscalls':cpu_stats.syscalls},
                        "cpuCount":psutil.cpu_count(logical=False)},"status": True })
