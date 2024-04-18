/*package team.bham.web.rest;

import javax.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import team.bham.service.ExploreFoldersService;
import team.bham.service.dto.ExploreFoldersDTO;

import java.util.List;

@RestController
@RequestMapping("/api/discover")
public class ExploreFoldersController {

    @Resource
    private ExploreFoldersService exploreFoldersService;

    @GetMapping("/folder")
    public List<ExploreFoldersDTO> fetchRandomFolders() {
        try {
            List<ExploreFoldersDTO> foldersDTOS = exploreFoldersService.fetchRandomFolders();
            return foldersDTOS;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
*/
