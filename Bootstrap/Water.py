def MaxVolume(a):
    l=len(a)
    water_volume=[]
    for i in range(0,l+1):
        for j in range(i+1,l):
            if a[i]<a[j]:
                width=j-i
                area=width*a[i]
                water_volume.append(area)
        
            elif a[i]>a[j]:
                width=j-i
                area=width*a[j]
                water_volume.append(area)
        
            else:
                area=width*a[i]
                water_volume.append(area)
    max=0  
    for each in water_volume:
        if each>max:
            max=each
    return(max)

a=[1,8,6,2,5,4,8,3,7]
MaxVolume(a)




