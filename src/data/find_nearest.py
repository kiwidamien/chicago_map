import pandas as pd
import geopandas as gpd
import json

def get_list_of_areas_close(point, df, num_to_return = 6):
    closest = [(point.distance(p), area) for p, area in zip(df.center, df.area_num_1)]
    closest = sorted(closest)[:num_to_return]
    return [area for dist, area in closest]

community = gpd.read_file('community.geojson')
community['area_num_1'] = community['area_num_1'].astype(int)
community.sort_values(by='area_num_1', inplace=True)
community['center'] = community['geometry'].apply(lambda row: row.centroid)

community2 = community.apply(lambda row: get_list_of_areas_close(row.center, community), axis=1)\
                      .apply(pd.Series)

json.dump(community2.values.tolist(), open('neighbor.js', 'w'))
