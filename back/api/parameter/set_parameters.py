from epics_db.pv_objects import thresholdPV, powerphPV, volumePV, molePV

def set_parameters(threshold, powerph, volume, mole):

    thresholdPV.put(value=threshold)
    powerphPV.put(value=powerph)
    volumePV.put(value=volume)
    molePV.put(value=mole)


def get_parameters():
    return {'threshold': thresholdPV.value,
            'powerph': powerphPV.value,
            'volume': volumePV.value,
            'mole': molePV.value}
