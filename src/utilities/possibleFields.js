const calculatePossibleFields = (sId, sx, sy) => {
    
    const possibleFieldsData = [];

    const p1Id = sId - 30;
    const p1x = parseInt(sx);
    const p1y = sy - 3;

    const p1 = {
        "id": p1Id,
        "x": p1x,
        "y": p1y,
        "status":"possible-field"
    }

    const p2Id = sId - 22;
    const p2x = sx - 2;
    const p2y = sy - 2;

    const p2 = {
        "id": p2Id,
        "x": p2x,
        "y": p2y,
        "status":"possible-field"        
    }
    
    const p3Id = sId - 18;
    const p3x = sx + 2;
    const p3y = sy - 2;

    const p3 = {
        "id": p3Id,
        "x": p3x,
        "y": p3y,
        "status":"possible-field"        
    }

    const p4Id = sId - 3;
    const p4x = sx - 3;
    const p4y = sy;

    const p4 = {
        "id": p4Id,
        "x": p4x,
        "y": p4y,
        "status":"possible-field"        
    }

    const p5Id = parseInt(sId)+3;
    const p5x = sx + 3;
    const p5y = sy;

    const p5 = {
        "id": p5Id,
        "x": p5x,
        "y": p5y,
        "status":"possible-field"        
    }

    const p6Id = parseInt(sId)+18;
    const p6x = sx -2;
    const p6y = sy+2;

    const p6 = {
        "id": p6Id,
        "x": p6x,
        "y": p6y,
        "status":"possible-field"        
    }

    const p7Id = parseInt(sId)+22;
    const p7x = sx +2;
    const p7y = sy+2;

    const p7 = {
        "id": p7Id,
        "x": p7x,
        "y": p7y,
        "status":"possible-field"        
    }

    const p8Id = parseInt(sId)+30;
    const p8x = sx;
    const p8y = sy+3;

    const p8 = {
        "id": p8Id,
        "x": p8x,
        "y": p8y,
        "status":"possible-field"        
    }

    possibleFieldsData.push(p1,p2,p3,p4,p5,p6,p7,p8)

    return possibleFieldsData;

}

export {
    calculatePossibleFields
}