import { HttpService } from "./http.service";

export class NavigationService {
    
    constructor(private httpService: HttpService) {}

    public stop(): Promise<string> {
        return this.httpService.get<string>('/stop');
    }

    public setSpeed(leftForward: boolean, pwmLeft: number, rightForward: boolean, pwmRight: number): Promise<string> {

        let axis = "X";
        let dist = 0;
        // convert left/right to x/y and send to positioner
        if (leftForward) {
            axis = "X";
            dist = pwmLeft;
        }
        else if (rightForward) {
            axis = "Y";
            dist = pwmRight;
        }
        else {
            axis = "XY";
            dist = pwmLeft;
        }

        // formulate url with axis/dist 
        // http://localhost:8000/PositionerController/movePositioner?positionerName=ESP32Stage&axis=X&dist=10000&isAbsolute=false
        return this.httpService.get<string>(`:8000/PositionerController/movePositioner?positionerName=ESP32Stage&axis=${axis}&dist=${dist}&isAbsolute=false`);
        

        return this.httpService.get<string>(`/navi?dl=${leftForward ? 1 : 0}&sl=${pwmLeft}&dr=${rightForward ? 1 : 0}&sr=${pwmRight}`);
    }

}