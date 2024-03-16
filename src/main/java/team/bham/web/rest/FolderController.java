package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import team.bham.service.FolderHandlerService;
import team.bham.service.dto.AddFolderDTO;
import team.bham.service.dto.FetchFolderDTO;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/folder")
public class FolderController {

    @Resource
    private FolderHandlerService folderHandlerService;

    @PostMapping("/addfolder")
    public ResponseUtils generateData(@RequestBody AddFolderDTO addFolderDTO) {
        ResponseUtils resp = null;
        System.out.println("Received folder: " + addFolderDTO);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername();
        } else if (authentication != null && authentication.getPrincipal() instanceof String) {
            userId = (String) authentication.getPrincipal();
        }
        try {
            folderHandlerService.generateFolder(addFolderDTO.getFolderName(), addFolderDTO.getImgURL(), userId);
            resp = new ResponseUtils();
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/fetchfolders")
    public ResponseUtils fetchFolder() {
        ResponseUtils resp = null;
        try {
            List<FetchFolderDTO> fetchFolderDTOS = folderHandlerService.fetchFolder();
            resp = new ResponseUtils().put("folder", fetchFolderDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
