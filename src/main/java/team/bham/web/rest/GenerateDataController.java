package team.bham.web.rest;

import javax.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.bham.service.GenerateTestDataService;
import team.bham.utils.ResponseUtils;

/**
 * @project : team31
 * @package: team.bham.web.rest
 * @class: GenerateDataController
 * @date: (UTC + 0 London) 04/03/2024 21:39
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

@RestController
@RequestMapping("/api")
public class GenerateDataController {

    @Resource
    private GenerateTestDataService generateTestDataService;

    @GetMapping("/generate")
    public ResponseUtils generateData() {
        ResponseUtils resp = null;
        try {
            generateTestDataService.generateTestDate();
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/generatemusic")
    public ResponseUtils generateMusic() {
        ResponseUtils resp = null;
        try {
            generateTestDataService.generateMusic();
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("generate-listen-entry")
    public ResponseUtils generateListenEntry() {
        ResponseUtils resp = null;
        try {
            generateTestDataService.generateTestWantToListenEntry();
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
