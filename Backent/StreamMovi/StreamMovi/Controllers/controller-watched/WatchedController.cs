using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StreamMovi.Controllers.controller_watched
{
    public class WatchedController : Controller
    {
        // GET: WatchedController
        public ActionResult Index()
        {
            return View();
        }

        // GET: WatchedController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: WatchedController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: WatchedController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: WatchedController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: WatchedController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: WatchedController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: WatchedController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
