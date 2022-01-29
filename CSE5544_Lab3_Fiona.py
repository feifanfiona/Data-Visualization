#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct 27 15:10:09 2020

@author: fionafei
"""

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import plotly.express as px
import plotly.io as pio

# read the total cases per state CSV
dataset1 = pd.read_csv('dataset-1.csv')

all_states = dataset1['state']
all_states.head()

df = pd.read_csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
df.head()


df_jan = df[df.date == '2020-01-31']
df_jan.head()

df_feb = df[df.date == '2020-02-29']
df_feb.head()

df_mar = df[df.date == '2020-03-31']
df_mar.head()

df_april = df[df.date == '2020-04-30']
df_april.head()

df_may = df[df.date == '2020-05-31']
df_may.head()

df_june = df[df.date == '2020-06-30']
df_june.head()

df_july = df[df.date == '2020-07-31']
df_july.head()

df_aug = df[df.date == '2020-08-30']
df_aug.head()

df_sep = df[df.date == '2020-09-30']
df_sep.head()

df_oct = df[df.date == '2020-10-25']
df_oct.head()


#for loop
df_jan
df_feb
month_list = [df_jan, df_feb, df_mar]
oct_all_states = []



for s in all_states: 
    print(state)
    
    for df_month in month_list:
        print(df_month['state'])
        if (df_month['state'] == s):
            case_num = df_month['cases']
            #oct_all_states.append({state: case_num})